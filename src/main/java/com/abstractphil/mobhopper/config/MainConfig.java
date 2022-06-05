package com.abstractphil.mobhopper.config;

import lombok.Data;

import java.util.Map;

@Data
public class MainConfig {
    private Map<String, MobHopperConfig> mobhopper;
}