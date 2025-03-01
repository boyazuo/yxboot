package com.yxboot.common.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class Dict implements Serializable {
    private String code;
    private String label;
    private String value;

    public Dict() {
    }

    public Dict(String value) {
        this.value = value;
    }
}
