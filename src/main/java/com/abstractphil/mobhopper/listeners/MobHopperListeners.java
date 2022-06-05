package com.abstractphil.mobhopper.listeners;

import com.abstractphil.mobhopper.AbsMobHopper;
import com.abstractphil.mobhopper.controller.MobHopperController;
import com.abstractphil.mobhopper.shapes.Area3D;
import com.abstractphil.mobhopper.shapes.Point3D;
import com.abstractphil.mobhopper.tools.AbsEntityUtil;
import com.abstractphil.mobhopper.tools.InventoryUtil;
import net.minecraft.server.v1_8_R3.*;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.block.Block;
import org.bukkit.block.BlockFace;
import org.bukkit.block.BlockState;
import org.bukkit.block.Hopper;
import org.bukkit.craftbukkit.v1_8_R3.block.CraftBlockState;
import org.bukkit.entity.Entity;
import org.bukkit.entity.LivingEntity;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;
import org.bukkit.event.block.BlockPlaceEvent;
import org.bukkit.event.entity.EntityDamageByEntityEvent;
import org.bukkit.event.entity.EntityDeathEvent;
import org.bukkit.event.inventory.InventoryPickupItemEvent;
import org.bukkit.event.world.ChunkLoadEvent;
import org.bukkit.event.world.ChunkUnloadEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.scheduler.BukkitRunnable;
import org.bukkit.scheduler.BukkitTask;

import java.util.*;

public class MobHopperListeners implements Listener {
    public static int pullTimer = 80;
    public static int dataKillTimer = 60;
    public static int dataPullTimer = 20;
    public static int range = 1;
    public static int odds = 100;

    private static final HashMap<UUID, CraftBlockState> tempEntities = new HashMap<>();

    public static MobHopperController controller() {
        return AbsMobHopper.getInstance().getMainController();
    }

    public MobHopperListeners() {
        super();
    }

    @EventHandler(priority = EventPriority.LOW)
    public void blockBreakMobSlayer(BlockBreakEvent event) {
        if(event.isCancelled() ||
                event.getPlayer() == null ||
                event.getBlock().getState() == null)
            return;

        if(event.getBlock().getState() instanceof CraftBlockState) {
            CraftBlockState craftBlockState = (CraftBlockState) event.getBlock().getState();

            if (MobHopperController.isSlayerBlockState(craftBlockState)) {
                // Remove mob slayer from the slayerData and blockKV lists.
                MobHopperController.unregisterBukkitTask(event.getBlock().getChunk(), craftBlockState);
                MobHopperController.removeKVData(craftBlockState);
                controller().restoreItem(event.getPlayer(), craftBlockState);
                //System.out.println("Mob Slayer broken; " + craftBlockState.getTileEntity());
                event.setDoesDrop(false);
                event.getBlock().setType(Material.AIR);
                event.setCancelled(true);
            }
        }
    }

    @EventHandler
    public void blockPlaceMobSlayer(BlockPlaceEvent event) {
        if(event.isCancelled() ||
                event.getPlayer() == null ||
                event.getPlayer().getItemInHand() == null ||
                event.getPlayer().getItemInHand().getType() == Material.AIR ||
                !MobHopperController.isMobSlayerItemStack(event.getPlayer().getItemInHand()) ||
                event.getBlock().getState() == null)
            return;
        prepareVariables();
        if(event.getBlock().getState() instanceof CraftBlockState) {
            CraftBlockState tileEntity = (CraftBlockState) event.getBlock().getState();
            if(tileEntity != null) {
                MobHopperController.setKVData(event.getPlayer(), tileEntity, event.getItemInHand());
                MobHopperController.registerBucketTask(event.getBlock().getChunk(), tileEntity,
                        prepareRunnableTask(tileEntity));
                //System.out.println("Mob Slayer placed; " + tileEntity.getTileEntity());
            }
        }
    }

    private static void prepareVariables() {
        dataKillTimer = controller().getMobHopperConfig().getKillTimer();
        pullTimer = controller().getMobHopperConfig().getPullTimer();
        range = controller().getMobHopperConfig().getRange();
        odds = controller().getMobHopperConfig().getSuccessChance();
    }

    @EventHandler
    public void onLoadMobSlayer(ChunkLoadEvent event) {
        if(event.getWorld() == null) return;
        try {
            prepareVariables();
            // Create slayerData from loaded KV data.
            for(BlockState uState : event.getChunk().getTileEntities()) {
                if(uState instanceof CraftBlockState) {
                    CraftBlockState state = (CraftBlockState)uState;
                    if (MobHopperController.isSlayerBlockState(state)) {
                        //System.out.println("Preparing to register mob slayer; " + state.getTileEntity());
                        MobHopperController.registerBucketTask(
                                event.getChunk(), state,
                                prepareRunnableTask(state));
                        //System.out.println("Mob Slayer loaded; " + state.getTileEntity());
                    }
                } else {
                    System.out.println("Is not block state;");
                    System.out.println(uState.getBlock());
                }
            }
        } catch(Exception ex){
            System.out.println("Failed to load mob slayer; ");
            ex.printStackTrace();
        }
    }

    @EventHandler
    public void onUnloadMobSlayer(ChunkUnloadEvent event) {
        // Probably not necessary.
        if(MobHopperController.getRegisteredRunnableTasks().containsKey(event.getChunk())) {
            if(MobHopperController.getRegisteredTimers(event.getChunk()) != null){
                MobHopperController.getRegisteredTimers(event.getChunk()).forEach( (key, val) -> {
                    val.cancel();
                });
            }
        }
    }

    @EventHandler
    public void onEntityDeathMobHopper(EntityDeathEvent event) {
        if(tempEntities.containsKey(event.getEntity().getUniqueId())) {
            ArrayList<ItemStack> drops = new ArrayList<>(event.getDrops());
            event.getDrops().clear();
            LivingEntity entity = event.getEntity();
            CraftBlockState hopperState = tempEntities.get(entity.getUniqueId());
            //System.out.println("Drops; " + drops);
            Hopper hopper = ((Hopper)hopperState.getBlock().getState());
            drops.forEach( (drop) -> {
                //System.out.println(drop.getAmount());
                //System.out.println(drop);
                if(InventoryUtil.canHoldItem(hopper.getInventory().getHolder().getInventory(), drop)) {
                    Bukkit.getPluginManager().callEvent(new InventoryPickupItemEvent(hopper.getInventory(),
                            event.getEntity().getWorld().dropItem(hopper.getLocation().add(0, 2, 0), drop)));
                } else {
                    event.getEntity().getWorld().dropItemNaturally(hopper.getLocation().add(0, 2, 0), drop);
                    //hopper.getInventory().addItem(drop);
                }
                hopper.update();
            });
            new BukkitRunnable() {
                @Override
                public void run() {
                    tempEntities.remove(entity.getUniqueId());
                }
            }.runTaskLaterAsynchronously(AbsMobHopper.getInstance(), 20);
        }
    }

    private BukkitTask prepareRunnableTask(CraftBlockState stateIn) {
        return new BukkitRunnable() {
            public final CraftBlockState state = stateIn;
            public final Block block = stateIn.getBlock();
            public int kills = 0;
            public final int maxKills = AbsMobHopper.getInstance().getMainController().getMobHopperConfig().getMaxEntitiesPerIteration();
            public int killTimer = dataKillTimer;
            public int pullTimer = dataPullTimer;
            public final Area3D pullArea = new Area3D(block.getLocation(), range);
            public final Point3D deathArea = new Point3D(block.getWorld(),
                    block.getX(), block.getY(), block.getZ());
            public final List<String> linkedMobs = MobHopperController.getLinkedMobs(state);
            private void resetKillCounter() {
                killTimer = AbsMobHopper.getInstance().getMainController().getMobHopperConfig().getKillTimer();
                kills = 0;
            }
            private void resetPullCounter() {
                pullTimer = AbsMobHopper.getInstance().getMainController().getMobHopperConfig().getPullTimer();
            }
            private boolean inPullRange(Entity entity) {
                return pullArea.inside(entity);
            }
            private boolean deathRange(Entity entity) {
                return deathArea.matchingWithLenience(entity.getLocation(), 0.5);
            }

            @Override
            public void run() {
                // If host block becomes air, something happened to the event should cancel.
                killTimer--;
                pullTimer--;
                boolean pullReady = pullTimer <= 0;
                boolean killReady = killTimer <= 0;
                if(killReady || pullReady) {
                    try {
                        //System.out.println("Mob slayer task running; " + block.getState().getLocation());
                        if(block.getType() == Material.AIR) {
                            System.out.println("A Mob Hopper is air, which means it's broken and must be cancelled.");
                            System.out.println(pullArea);
                            cancel();
                            return;
                        }
                        // Check surrounding area for CROPS
                        //System.out.println("Running mob slayer at; " + block.getLocation());
                        //System.out.println("Linked mobs; " + linkedMobs);
                        // Generate mob list within range
                        for(Entity ent : block.getChunk().getWorld().getEntitiesByClasses(LivingEntity.class)) {
                            if(ent instanceof LivingEntity && !tempEntities.containsKey(ent.getUniqueId())) {
                                LivingEntity lEntity = (LivingEntity) ent;
                                if (!(lEntity instanceof Player) && linkedMobs.contains(lEntity.getType().toString())) {
                                    if(inPullRange(lEntity) && pullReady) {// pull in
                                        //System.out.println("pulling; " + ent);
                                        //System.out.println("to; " + block.getLocation());
                                        lEntity.teleport(block.getLocation().add(0.5, 1.6, 0.5));
                                        //AbsEntityUtil.moveToward(lEntity, block.getLocation(), 1);
                                    }
                                    if(deathRange(lEntity) && killReady){
                                        if(kills > maxKills) continue;
                                        tempEntities.put(lEntity.getUniqueId(), state);
                                        //System.out.println("killing; " + ent);
                                        //System.out.println("at; " + block.getLocation());
                                        lEntity.setHealth(0);
                                        Bukkit.getPluginManager().callEvent(
                                                new EntityDeathEvent(lEntity, new ArrayList<>()));
                                        kills++;
                                    }
                                }
                            }
                        }
                        //if(kills > 0)
                         //   System.out.println("Kills " + kills + " " + block.getLocation());
                        if(pullReady) resetPullCounter();
                        if(killReady) resetKillCounter();

                    } catch (Exception ex) {
                        ex.printStackTrace();
                        cancel();
                    }
                }
            }

        }.runTaskTimer(AbsMobHopper.getInstance(), 0, 1);
    }



}
