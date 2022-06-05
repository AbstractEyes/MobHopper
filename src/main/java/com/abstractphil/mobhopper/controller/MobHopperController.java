package com.abstractphil.mobhopper.controller;

import com.abstractphil.mobhopper.config.MainConfig;
import com.abstractphil.mobhopper.config.MobHopperConfig;
import com.abstractphil.mobhopper.mobslayerdata.MobHopperItem;
import com.abstractphil.mobhopper.tools.AbsItemUtil;
import com.abstractphil.mobhopper.tools.InventoryUtil;
import com.abstractphil.mobhopper.tools.NBTUtil;
import com.redmancometh.configcore.config.ConfigManager;
import com.redmancometh.warcore.util.ItemUtil;
import lombok.Getter;
import net.minecraft.server.v1_8_R3.NBTTagCompound;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Chunk;
import org.bukkit.block.BlockState;
import org.bukkit.craftbukkit.v1_8_R3.block.CraftBlockState;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.potion.PotionEffectType;
import org.bukkit.scheduler.BukkitTask;

import javax.annotation.Nullable;
import java.util.*;

@Getter
public class MobHopperController {
	private final ConfigManager<MainConfig> cfg =
				new ConfigManager("mobhopper.json", MainConfig.class);
	private static final HashMap<Chunk,
				HashMap<CraftBlockState, BukkitTask>>
			registeredRunnables = new HashMap<>();
	private static MobHopperItem itemData;

	public MobHopperConfig getMobHopperConfig() {
		return cfg.getConfig().getMobhopper().get("mob-hopper-config");
	}

	public void init() {
		cfg.init();
		itemData = new MobHopperItem();
		MobHopperConfig confi = getMobHopperConfig();
		String name = confi.getName();
		String material = confi.getMaterial();
		List<String> list = confi.getLore();
		itemData.setItemConfig(name, list, material);
	}

	public void terminate() {
		registeredRunnables.forEach( (chunk, map) -> {
			map.forEach( (tile, task) -> {
				task.cancel();
			});
		});
		registeredRunnables.clear();
	}

	public void restoreItem(Player player, CraftBlockState state) {
		ItemStack item = ItemUtil.buildItem(
				itemData.getMaterialData(),
				itemData.getNameData(),
				itemData.getLoreData());
		item.setAmount(1);
		if(state.getTileEntity().kv.containsKey("uuid")) {
			item = NBTUtil.setData(item, "uuid", state.getTileEntity().kv.get("uuid"));
		}
		if(state.getTileEntity().kv.containsKey("mobs")) {
			item = NBTUtil.setData(item, "mobs", state.getTileEntity().kv.get("mobs"));
		}
		item = NBTUtil.setData(item, "blockmobhopper", true);
		InventoryUtil.safeAddMobHopperInventory(player, item);
	}

	public static ItemStack makeGadgetItem(int amount, String uidIn, String mobsIn) {
		System.out.println(itemData);
		ItemStack item = ItemUtil.buildItem(
				itemData.getMaterialData(),
				itemData.getNameData(),
				itemData.getLoreData());
		item.setAmount(amount);
		UUID uid = UUID.randomUUID();
		item = NBTUtil.setData(item, "blockmobhopper", true);
		if(uidIn.equals("")) item = NBTUtil.setData(item, "uuid", uid.toString());
		else item = NBTUtil.setData(item, "uuid", uidIn);
		if(mobsIn.equals("")) item = NBTUtil.setData(item, "mobs", "ZOMBIE|SKELETON|PIG");
		else item = NBTUtil.setData(item, "mobs", mobsIn);

		return item;
	}

	public static ArrayList<String> getMobHopperProperties(ItemStack item) {
		if(isMobSlayerItemStack(item)) {
			ArrayList<String> out = new ArrayList<>();
			out.add(NBTUtil.getStringData(item, "uuid"));
			out.add(NBTUtil.getStringData(item, "mobs"));
			return out;
		}
		return new ArrayList<>();
	}


	@Nullable
	public static HashMap<CraftBlockState, BukkitTask> getRegisteredTimers(Chunk chunkIn) {
		if(registeredRunnables.containsKey(chunkIn)) return registeredRunnables.get(chunkIn);
		return null;
	}

	public static HashMap<Chunk, HashMap<CraftBlockState, BukkitTask>> getRegisteredRunnableTasks() {
		return registeredRunnables;
	}

	public static void registerBucketTask(Chunk chunk, CraftBlockState blockState, BukkitTask bukkitTask) {
		if(!registeredRunnables.containsKey(chunk)) registeredRunnables.put(chunk, new HashMap<>());
		registeredRunnables.get(chunk).put(blockState, bukkitTask);
		//System.out.println("Mob Hopper task registered;");
		//System.out.println(blockState.getTileEntity());
		//System.out.println(registeredRunnables);
	}

	public static void unregisterBukkitTask(Chunk chunk, CraftBlockState blockState) {
		if(!registeredRunnables.containsKey(chunk)) registeredRunnables.put(chunk, new HashMap<>());
		if(registeredRunnables.get(chunk).containsKey(blockState)) {
			registeredRunnables.get(chunk).get(blockState).cancel();
			registeredRunnables.get(chunk).remove(blockState);
			//System.out.println("mob hopper task unregistered;");
			//System.out.println(blockState.getTileEntity());
			//System.out.println(registeredRunnables);
		}
	}

	public static List<String> getLinkedMobs(ItemStack mobHopperItem) {
		if(NBTUtil.hasData(mobHopperItem, "mobs") && NBTUtil.getStringData(mobHopperItem, "mobs").length() > 0) {
			return(new ArrayList<>(Arrays.asList(NBTUtil.getStringData(mobHopperItem, "mobs").split("\\|"))));
		}
		return new ArrayList<>();
	}

	public static List<String> getLinkedMobs(CraftBlockState blockState) {
		if(blockState.getTileEntity().kv.containsKey("mobs")) {
			return(new ArrayList<>(Arrays.asList(blockState.getTileEntity().kv.get("mobs").split("\\|"))));
		}
		return new ArrayList<>();
	}

	public static ItemStack setLinkedMobs(ItemStack item, List<String> list) {
		StringBuilder strOut = new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			String str = list.get(i);
			if(i < list.size() - 1) {
				strOut.append(str).append("|");
			}
		}
		return setLinkedMobs(item, strOut.toString());
	}

	public static ItemStack setLinkedMobs(ItemStack item, String prepared) {
		return NBTUtil.setData(item, "mobs", prepared);
	}

	public static void setKVData(Player player, CraftBlockState blockState, ItemStack item) {
		blockState.getTileEntity().b(new NBTTagCompound());
		blockState.getTileEntity().kv.put("blockmobhopper", player.getUniqueId().toString());
		if(NBTUtil.getStringData(item, "uuid") != null) {
			System.out.println("Mob Hopper KV added, UUID attached;");
			blockState.getTileEntity().kv.put("uuid", NBTUtil.getStringData(item, "uuid"));
		}
		if(NBTUtil.hasData(item, "mobs")) {
			blockState.getTileEntity().kv.put("mobs", NBTUtil.getStringData(item, "mobs"));
		}
		//System.out.println("Mob Slayer KV set; ");
		//System.out.println(blockState.getTileEntity());
	}

	public static void removeKVData(CraftBlockState blockState) {
		blockState.getTileEntity().kv.remove("blockmobhopper");
		//System.out.println("Mob Hopper KV removed, UUID still attached;");
		//System.out.println(blockState.getTileEntity());
	}

	public static boolean isSlayerBlockState(BlockState bStateIn) {
		if(!(bStateIn instanceof CraftBlockState)) return false;
		CraftBlockState blockState = (CraftBlockState) bStateIn;
		if(blockState.getTileEntity() == null || blockState.getTileEntity().kv == null)
			return false;
		//System.out.println("Is Mob SLayer block state; " + blockState.getTileEntity().kv.containsKey("blockmobhopper"));
		return(blockState.getTileEntity().kv.containsKey("blockmobhopper"));
	}

	public static boolean isMobSlayerItemStack(ItemStack item) {
		return NBTUtil.hasData(item, "blockmobhopper");
	}

}
