package com.abstractphil.mobhopper.config;

import com.redmancometh.entities.pojo.EntityData;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class MobHopperConfig {
    private List<String> messages, lore, cropBlocks;
    private String name, material;
    private int pullTimer, killTimer, range, successChance, maxEntitiesPerIteration;
}
