package com.yxboot.common.aspect;


import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang.ArrayUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import com.yxboot.common.enums.LogTypeEnum;
import com.yxboot.modules.sys.entity.SysLog;
import com.yxboot.modules.sys.entity.SysUser;
import com.yxboot.modules.sys.service.SysLogService;
import com.yxboot.modules.sys.service.SysUserService;
import com.yxboot.utils.CusAccessObjectUtil;
import com.yxboot.utils.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Aspect
@Component
@Slf4j
public class SysLogAspect {
    @Autowired
    private SysLogService sysLogService;
    @Autowired
    private SysUserService sysUserService;

    // 定义切点@Pointcut
    // 在注解的位置切入代码
    @Pointcut("@annotation(com.yxboot.common.aspect.SysLogOperation)")
    public void logPoinCut() {

    }

    // 切面 配置通知
    @AfterReturning("logPoinCut()")
    public void saveSysLog(JoinPoint joinPoint) {
        // 保存日志
        SysLog sysLog = new SysLog();
        // 从切面织入点处通过反射机制获取织入点处的方法
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        // 获取切入点所在的方法
        Method method = signature.getMethod();
        // 获取操作
        SysLogOperation operation = method.getAnnotation(SysLogOperation.class);
        if (operation != null) {
            String value = operation.value();
            sysLog.setOperation(value);// 保存获取的操作
            sysLog.setType(operation.type());
            if (sysLog.getType() != LogTypeEnum.LOGIN) {
                Long userId = UserUtil.getCurrentUserId();
                SysUser user = sysUserService.getById(userId);
                sysLog.setUsername(user.getUsername());
            }
        }
        // 获取请求的类名
        String className = joinPoint.getTarget().getClass().getName();
        // 获取请求的方法名
        String methodName = method.getName();
        sysLog.setMethod(className + "." + methodName);
        // 请求的参数
        Map<String, Object> params = new HashMap<>();
        if (joinPoint.getArgs() != null) {
            getParams(params, joinPoint, signature);
        }
        // 将参数所在的数组转换成json
        if (params.size() > 0) {
            if (sysLog.getType() == LogTypeEnum.LOGIN) {
                sysLog.setUsername(params.get("username").toString());
            }
            sysLog.setParams(params.toString());
        } else {
            sysLog.setParams("无参数");
        }


        // 获取用户ip地址
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        sysLog.setIp(CusAccessObjectUtil.getIpAddress(request));

        sysLog.setCreateTime(new Date());
        sysLogService.save(sysLog);

    }


    /**
     * 获取方法的参数名和值
     *
     * @param joinPoint
     * @return
     */
    public void getParams(Map<String, Object> params, JoinPoint joinPoint, MethodSignature signature) {

        Object[] args = joinPoint.getArgs();
        String[] names = signature.getParameterNames();
        if (ArrayUtils.isNotEmpty(args) && ArrayUtils.isNotEmpty(names)) {
            for (int i = 0; i < args.length; i++) {
                params.put(names[i], args[i]);
            }
        }

    }

}
