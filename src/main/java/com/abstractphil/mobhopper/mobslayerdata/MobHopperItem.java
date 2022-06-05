package com.abstractphil.mobhopper.mobslayerdata;

import lombok.Data;
import org.bukkit.Material;

import java.util.List;

@Data
public class MobHopperItem {
    String nameData;
    Material materialData;
    List<String> loreData;

    public void setItemConfig(String nameIn, List<String> loreIn, String materialIn){
        nameData = nameIn;
        loreData = loreIn;
        materialData = Material.getMaterial(materialIn);
    }

}
