package com.abstractphil.mobhopper.commands;

import com.abstractphil.mobhopper.controller.MobHopperController;
import com.abstractphil.mobhopper.tools.InventoryUtil;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.inventory.Inventory;
import org.bukkit.inventory.ItemStack;

public class GiveMobHopper implements CommandExecutor {

	@Override
	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		if (!sender.isOp()) return false;
		try {
			if(Bukkit.getPlayer(args[0]) != null) {
				Player player = Bukkit.getPlayer(args[0]);
				Inventory inventory = player.getInventory();
				String mobs = "";
				String uuid = "";
				if(args.length > 2) {
					uuid = args[2];
					mobs = args[3];
				}
				int amount = Integer.parseInt(args[1]);
				for(int i = 0; i < amount; i++) {
					ItemStack item = MobHopperController.makeGadgetItem(1, uuid, mobs);
					InventoryUtil.safeAddMobHopperInventory(player, item);
				}
			}
			return true;
		} catch (Exception ex) {
			System.out.println("Failed to give mob hopper.");
			ex.printStackTrace();
		}
		return true;
	}

}
