package com.abstractphil.mobhopper.shapes;

import lombok.Data;
import org.bukkit.Location;
import org.bukkit.World;
import org.bukkit.util.Vector;

import java.awt.*;

@Data
public class Point3D extends Point2D {
    protected double z;
    private World world;
    public Point3D(World worldIn, double xin, double yin, double zin) {
        super(xin, yin);
        setWorld(worldIn);
        setZ(zin);
    }
    public Point3D() {
        super();
        z = 0;
    }

    public Point3D setPosition(World world, double xin, double yin, double zin) {
        setWorld(world);
        return setPosition(xin, yin, zin);
    }

    public Point3D setPosition(double xin, double yin, double zin) {
        setX(xin);
        setY(yin);
        setZ(zin);
        return this;
    }

    public boolean matching(Point3D pointIn) {
        return (pointIn.getX() == this.getX() && pointIn.getY() == this.getY() && pointIn.getZ() == this.getZ());
    }
    public boolean matching(Location pointIn) {
        return (pointIn.getX() == this.getX() && pointIn.getY() == this.getY() && pointIn.getZ() == this.getZ());
    }
    public boolean matchingWithLenience(Location pointIn, double lenience) {
        /*
        System.out.println("matching with lenience; ");
        System.out.println(" pointIn.getX() >= (this.getX() - lenience)" + (pointIn.getX() >= (this.getX() - lenience)));
        System.out.println(" pointIn.getX() <= (this.getX() + lenience)" + (pointIn.getX() <= (this.getX() + lenience)));
        System.out.println(" pointIn.getY() >= (this.getY() - lenience)" + (pointIn.getY() >= (this.getY() - lenience)));
        System.out.println(" pointIn.getY() <= (this.getY() + lenience)" + (pointIn.getY() <= (this.getY() + lenience + 1)));
        System.out.println(" pointIn.getY() " + pointIn.getY());
        System.out.println(" this.getY() " + this.getY());
        System.out.println(" pointIn.getZ() >= (this.getZ() - lenience)" + (pointIn.getZ() >= (this.getZ() - lenience)));
        System.out.println(" pointIn.getZ() <= (this.getZ() + lenience)" + (pointIn.getZ() <= (this.getZ() + lenience)));
        */
        return ( world.getUID() == pointIn.getWorld().getUID() &&
                pointIn.getX() >= (this.getX() - lenience) &&
                pointIn.getX() <= (this.getX() + lenience) &&
                pointIn.getY() >= (this.getY() - lenience) &&
                pointIn.getY() <= (this.getY() + lenience + 1) &&
                pointIn.getZ() >= (this.getZ() - lenience) &&
                pointIn.getZ() <= (this.getZ() + lenience)
        );
    }


    public Point getPointXY() {
        return new Point((int)x, (int)y);
    }
    public Point getPointYZ() {
        return new Point((int)y, (int)z);
    }
    public Point getPointXZ() {
        return new Point((int)x, (int)z);
    }

    public Vector getPointVector3D() {
        return new Vector(x, y, z);
    }

    public Location getLocation() {
        return new Location(world, x, y, z);
    }
}
