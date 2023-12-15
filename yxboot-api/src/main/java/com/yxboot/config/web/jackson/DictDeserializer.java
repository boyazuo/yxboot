package com.yxboot.config.web.jackson;

import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.deser.ContextualDeserializer;
import com.yxboot.common.vo.Dict;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class DictDeserializer extends JsonDeserializer<Dict> implements ContextualDeserializer {
    public final static DictDeserializer instance = new DictDeserializer();
    private static Map<Class<? extends Dict>, JsonDeserializer> cache = new HashMap<>();
    private Class<? extends Dict> clz;
    @Override
    public Dict deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        if(jsonParser.getCurrentToken() == JsonToken.START_OBJECT) {
            return new ObjectMapper().readValue(jsonParser, Dict.class);
        } else {
            String value = jsonParser.getValueAsString();
            if(StrUtil.isNotBlank(value)){
                return new Dict(value);
            }
            return null;
        }
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext deserializationContext, BeanProperty beanProperty) throws JsonMappingException {
        Class rawCls = deserializationContext.getContextualType().getRawClass();
        if(cache.containsKey(rawCls)){
            return cache.get(rawCls);
        }else {
            DictDeserializer clone = new DictDeserializer();
            clone.setClz(rawCls);
            cache.put(rawCls, clone);
            return clone;
        }
    }

    public void setClz(Class<? extends Dict> clz) {
        this.clz = clz;
    }
}
