package com.yxboot.common.vo;

import lombok.Data;

@Data
public class AccountToken {

    private Long userId;

    private String username;

    private String name;

    private String avatar;

    private String phone;

    private String email;

    private String token;
}
