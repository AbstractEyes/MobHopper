package com.abstractphil.mobhopper.shapes;


import lombok.Data;
import org.bukkit.Location;
import org.bukkit.block.Block;
import org.bukkit.entity.Entity;

@Data
public class Area3D {

    private int x1,
            x2,
            y1,
            y2,
            z1,
            z2;

    public Area3D(int x1In, int x2in, int y1in, int y2in, int z1in, int z2in) {
        x1 = x1In;
        x2 = x2in;
        y1 = y1in;
        y2 = y2in;
        z1 = z1in;
        z2 = z2in;
    }

    public Area3D(Area3D areaIn) {
        x1 = areaIn.getX1();
        x2 = areaIn.getX2();
        y1 = areaIn.getY1();
        y2 = areaIn.getY2();
        z1 = areaIn.getZ1();
        z2 = areaIn.getZ2();
    }

    public Area3D(Block block, int range) {
        x1 = block.getX()-range;
        x2 = block.getX()+range;
        y1 = block.getY()-range;
        y2 = block.getY()+range;
        z1 = block.getZ()-range;
        z2 = block.getZ()+range;
    }

    public Area3D(Location block, int range) {
        x1 = block.getBlockX()-range;
        x2 = block.getBlockX()+range;
        y1 = block.getBlockY()-range;
        y2 = block.getBlockY()+range;
        z1 = block.getBlockZ()-range;
        z2 = block.getBlockZ()+range;
    }



    public boolean insideXZ(int x, int z) {
        return(x1 <= x && x2 >= x && z >= z1 && z <= z2);
    }

    public boolean inside(Entity entity) {
        return(inside(
                entity.getLocation().getBlockX(),
                entity.getLocation().getBlockY(),
                entity.getLocation().getBlockZ()));
    }

    public boolean inside(Point3D point) {
        return inside(point.getX(), point.getY(), point.getZ());
    }

    public boolean inside(double xin, double yin, double zin) {
        return inside((int)xin, (int)yin, (int)zin);
    }

    public boolean inside(int x, int y, int z) {
        return(x1 <= x && x2 >= x && y >= y1 && y <= y2 && z >= z1 && z <= z2);
    }

    public boolean intersecting3DAreas(Area3D otherArea) {
        if (this.y2 < otherArea.y1 || this.y1 > otherArea.y2) {
            return false;
        }
        if (this.x2 < otherArea.x1 || this.x1 > otherArea.x2) {
            return false;
        }
        if (this.z2 < otherArea.z1 || this.z1 > otherArea.z2) {
            return false;
        }
        return true;
    }

}
