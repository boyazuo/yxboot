package com.yxboot.test;


import com.yxboot.YXBootApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = YXBootApplication.class)
@WebAppConfiguration
public class MockTest {
    @Test
    public void testRun() {

    }

}
