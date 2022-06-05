package com.abstractphil.mobhopper;

import com.abstractphil.mobhopper.controller.MobHopperController;
import com.abstractphil.mobhopper.listeners.MobHopperListeners;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

import com.abstractphil.mobhopper.commands.GiveMobHopper;

import lombok.Getter;

@Getter
public class AbsMobHopper extends JavaPlugin {
	private MobHopperController mainController;

	@Override
	public void onEnable() {
		System.out.println("Initializing mob hopper plugin;");
		super.onEnable();
		this.mainController = new MobHopperController();
		this.mainController.init();
		System.out.println("Done initializing mob hopper plugin.");
		getCommand("givemobhopper").setExecutor(new GiveMobHopper());
		Bukkit.getPluginManager().registerEvents(new MobHopperListeners(), this);
	}

	@Override
	public void onDisable() {
		mainController.terminate();
		super.onDisable();
	}

	public static AbsMobHopper getInstance() {
		return JavaPlugin.getPlugin(AbsMobHopper.class);
	}
}
