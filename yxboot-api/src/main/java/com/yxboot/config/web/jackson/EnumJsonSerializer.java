package com.yxboot.config.web.jackson;

import java.io.IOException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.yxboot.common.base.BaseEnum;
import cn.hutool.core.util.StrUtil;

public class EnumJsonSerializer extends JsonSerializer<BaseEnum> {
    public final static EnumJsonSerializer instance = new EnumJsonSerializer();

    @Override
    public void serialize(BaseEnum baseEnum, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        String name = gen.getOutputContext().getCurrentName();
        gen.writeString(baseEnum.getValue());
        gen.writeStringField(StrUtil.format("{}Desc", name), baseEnum.getDesc());
        gen.writeFieldName(StrUtil.format("{}Enum", name));
        gen.writeStartObject();
        gen.writeStringField("value", baseEnum.getValue());
        gen.writeStringField(StrUtil.format("desc", name), baseEnum.getDesc());
        gen.writeEndObject();
    }
}
