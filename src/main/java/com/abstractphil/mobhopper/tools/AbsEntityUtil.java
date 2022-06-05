package com.abstractphil.mobhopper.tools;

import org.bukkit.Location;
import org.bukkit.entity.Entity;
import org.bukkit.entity.LivingEntity;
import org.bukkit.util.Vector;

public class AbsEntityUtil {

    public static void moveToward(LivingEntity entity, Location to, double speed){
        Location loc = entity.getLocation();
        double x = loc.getX() - to.getX();
        double y = loc.getY() - to.getY();
        double z = loc.getZ() - to.getZ();
        Vector velocity = new Vector(x, y, z).normalize().multiply(-speed);
        entity.setVelocity(velocity);
    }

    public static void moveAway(LivingEntity entity, Location from, double speed){
        Location loc = entity.getLocation();
        double x = loc.getX() + from.getX();
        double y = loc.getY() + from.getY();
        double z = loc.getZ() + from.getZ();
        Vector velocity = new Vector(x, y, z).normalize().multiply(-speed);
        entity.setVelocity(velocity);
    }

}
