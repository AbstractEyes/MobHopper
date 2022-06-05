package com.abstractphil.mobhopper.shapes;

import lombok.Data;
import org.bukkit.util.Vector;

@Data
public class Point2D {
    protected double x, y;
    public Point2D(double xin, double yin) {
        super();
        setX(xin);
        setY(yin);
    }
    public Vector getVector2D() {
        return new Vector((int)x, (int)y, 0);
    }

    public Point2D() {
        setX(0);
        setY(0);
    }
}
