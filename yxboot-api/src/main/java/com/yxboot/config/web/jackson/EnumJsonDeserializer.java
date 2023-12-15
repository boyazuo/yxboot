package com.yxboot.config.web.jackson;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;
import com.yxboot.common.base.BaseEnum;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class EnumJsonDeserializer extends JsonDeserializer<BaseEnum> implements ContextualDeserializer {
    public final static EnumJsonDeserializer instance = new EnumJsonDeserializer();
    private static Map<Class<? extends BaseEnum>, JsonDeserializer> cache = new HashMap<>();
    private Class<? extends BaseEnum> clz;
    @Override
    public BaseEnum deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        BaseEnum baseEnum = null;
        String value = jsonParser.getValueAsString();
        if(value != null){
            for (BaseEnum base : clz.getEnumConstants()) {
                if(value.equals(base.getValue()) || value.equals(base.getDesc())){
                    baseEnum = base;
                }
            }
        }
        return baseEnum;
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext deserializationContext, BeanProperty beanProperty) throws JsonMappingException {
        Class rawCls = deserializationContext.getContextualType().getRawClass();
        if(cache.containsKey(rawCls)){
            return cache.get(rawCls);
        }else {
            EnumJsonDeserializer clone = new EnumJsonDeserializer();
            clone.setClz(rawCls);
            cache.put(rawCls, clone);
            return clone;
        }
    }

    public void setClz(Class<? extends BaseEnum> clz) {
        this.clz = clz;
    }
}
