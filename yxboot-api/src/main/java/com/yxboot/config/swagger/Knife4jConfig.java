package com.yxboot.config.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.apache.http.HttpHeaders;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Knife4jConfig {
    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(apiInfo())
                //全局安全校验项，也可以在对应的controller上加注解SecurityRequirement
                .components(new Components().addSecuritySchemes(HttpHeaders.AUTHORIZATION, this.securityScheme()))
                .addSecurityItem(new SecurityRequirement().addList(HttpHeaders.AUTHORIZATION));
    }

    private Info apiInfo() {
        return new Info()
                .title("YXBoot API接口文档")
                .version("1.0.0")
                .description("YXBoot Api接口文档")
                .contact(new Contact().name("云行科技")
                        .url("http://www.yxboot.com")
                );
    }

    private SecurityScheme securityScheme() {
        SecurityScheme securityScheme = new SecurityScheme();
        securityScheme.setType(SecurityScheme.Type.APIKEY);
        securityScheme.setName(HttpHeaders.AUTHORIZATION);
        securityScheme.setIn(SecurityScheme.In.HEADER);
        securityScheme.scheme("Bearer");
        securityScheme.bearerFormat("JWT");
        return securityScheme;
    }
}
