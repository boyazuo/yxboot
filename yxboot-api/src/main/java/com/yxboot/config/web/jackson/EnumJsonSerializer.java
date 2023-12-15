package com.yxboot.config.web.jackson;

import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.yxboot.common.base.BaseEnum;

import java.io.IOException;

public class EnumJsonSerializer extends JsonSerializer<BaseEnum> {
    public final static EnumJsonSerializer instance = new EnumJsonSerializer();
    @Override
    public void serialize(BaseEnum baseEnum, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        String name = gen.getOutputContext().getCurrentName();
        gen.writeNumber(baseEnum.getValue());
        gen.writeStringField(StrUtil.format("{}Desc", name), baseEnum.getDesc());
        gen.writeFieldName(StrUtil.format("{}Enum", name));
        gen.writeStartObject();
        gen.writeNumberField("value", baseEnum.getValue());
        gen.writeStringField(StrUtil.format("desc", name), baseEnum.getDesc());
        gen.writeEndObject();
    }
}
