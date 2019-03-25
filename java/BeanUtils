package com.sjzk.service.util;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.MethodUtils;
import org.apache.commons.lang.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Bean相关操作处理工具
 *
 * @yaozhou version1.0
 */
public class BeanUtils {

    /**
     * 根据传入的cls复制整个对象的属性到另外对象的对应的同名和同类型的属（只复制cls存在的且属同名和同类型的属性
     *
     * @param vo<Object>       源对象
     * @param target<Object>   目标对象
     * @param cls<Class>       被拷贝的对象类型
     * @param not_copy<String> 用于指定不拷贝的属性名，可传多个属性名，之间用逗号隔开
     */
    private static void copyObjectValue(Object vo, Object target, Class cls, String not_copy, boolean isCopyNull) {
        int flag = 0;
        if (StringUtils.isNotBlank(not_copy)) {
            not_copy = "," + not_copy + ",";//前后加','号是为了后面能够准确的判断对象包含的属性名
        }
        try {
            String sname = "";
            Field[] fields = cls.getDeclaredFields();
            for (Field field : fields) {
                sname = field.getName();
                //id 和 notCopy 包含的屬性不複製
                if (sname.toLowerCase().equals("id") || (StringUtils.isNotBlank(not_copy) && not_copy.contains("," + sname + ",")))
                    continue;
                //字段類型為接口對象  不复制
                if (field.getType().toString().startsWith("interface")) {
                    continue;
                }

                if (field.getType().toString().startsWith("class")
                        && !field.getType().getName().equals("java.lang.String")) { //对象类型字段值拷�?
                    try {
                        Object value =  MethodUtils.invokeMethod(vo, "get" + sname.substring(0, 1).toUpperCase() + sname.substring(1), null);
                        BeanUtils.setProperty(target, sname,value);
                    } catch (Exception ne) {
                        flag = 1;
                    }
                } else { //基本类型字段值拷贝
                    try {
                        if (!isCopyNull && BeanUtils.getProperty(vo, sname) == null) {
                            continue;
                        }
                        BeanUtils.setProperty(target, sname, BeanUtils.getProperty(vo, sname));
                    } catch (Exception ne) {
                        flag = 1;
                    }
                }
            }
        } catch (Exception e) {
            flag = 1;
            e.printStackTrace();
        }

        if (flag == 1) {
            System.gc();
        }
    }

    /**
     * 复制整个对象的属性到另外对象的对应的同名和同类型的属性名
     *
     * @param vo<Object>     源对象
     * @param target<Object> 目标对象
     */
    public static void copyObjValue(Object vo, Object target) {
        Class cls = vo.getClass();
        while (!cls.getName().equals("java.lang.Object")) {
            copyObjectValue(vo, target, cls, null, false);
            cls = cls.getSuperclass();
        }
    }

    /**
     * 复制整个对象的属性到另外对象的对应的同名和同类型的属性
     *
     * @param vo<Object>         源对象
     * @param target<Object>      目标对象
     * @param isCopyNull<boolean> 是否拷贝NULL
     */
    public static void copyObjValue(Object vo, Object target, boolean isCopyNull) {
        Class cls = vo.getClass();
        while (!cls.getName().equals("java.lang.Object")) {
            copyObjectValue(vo, target, cls, null, isCopyNull);
            cls = cls.getSuperclass();
        }
    }

    /**
     * 复制整个对象的属性到另外对象的对应的同名和同类型的属性
     *
     * @param vo<Object>       源对象
     * @param target<Object>   目标对象
     * @param not_copy<String> 用于指定不拷贝的，可传多个属性名，之间用逗号隔开
     */
    public static void copyObjValue(Object vo, Object target, String not_copy) {
        Class cls = vo.getClass();
        while (!cls.getName().equals("java.lang.Object")) {
            copyObjectValue(vo, target, cls, not_copy, false);
            cls = cls.getSuperclass();
        }
    }

    /**
     复制整个对象的属性到另外对象的对应的同名和同类型的属性
     *
     * @param vo<Object>          源对象
     * @param target<Object>      目标对象
     * @param not_copy<String>    用于指定不拷贝的属性名，可传多个属性名，之间用逗号隔开
     * @param isCopyNull<boolean> 是否拷贝NULL
     */
    public static void copyObjValue(Object vo, Object target, String not_copy, boolean isCopyNull) {
        Class cls = vo.getClass();
        while (!cls.getName().equals("java.lang.Object")) {
            copyObjectValue(vo, target, cls, not_copy, isCopyNull);
            cls = cls.getSuperclass();
        }
    }


    /**
     * 将对象转为map  key字段名称
     * @param obj 需要转换为map的对象
     * @return 返回map
     */
    public static Map<String, Object> handlerItem(Object obj) {
        Class clazz = obj.getClass();
        Field[] fields = clazz.getDeclaredFields();
        Map<String, Object> item = new HashMap<String, Object>();
        try {
            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(obj);
                String key = field.getName();
                String type = field.getType().toString();
                if (type.endsWith("String") || type.endsWith("int") || type.endsWith("Integer")) {
                    item.put(key, value);
                } else if (value instanceof Date) {
                    SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    item.put(key, sFormat.format(value));
                } else {
                    item.put(key, value == null ? "" : value.toString());
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
        return item;
    }


    /**
     *  将对象转为json 字符串
     * @param obj 转换的对象
     * @return string 装换后的字符串
     */
    public static JSONObject handlerJsonObject(Object obj) {
        Class clazz = obj.getClass();
        Field[] fields = clazz.getDeclaredFields();
        JSONObject item = new JSONObject();
        try {
            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(obj);
                String key = field.getName();
                String type = field.getType().toString();
                if (type.endsWith("String") || type.endsWith("int") || type.endsWith("Integer")) {
                    item.put(key, value);
                } else if (value instanceof Date) {
                    SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    item.put(key, sFormat.format(value));
                } else {
                    item.put(key, value == null ? "" : value.toString());
                }
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return item;
    }

    /**
     * 将对象转换为map 并装入 item中
     * @param obj 转换对象
     * @param item 装载的map
     * @return map
     */
    public static Map<String, Object> handlerItem(Object obj, Map<String, Object> item) {
        Map<String, Object> objItem = handlerItem(obj);
        item.putAll(objItem);
        return item;
    }

    /**
     * 将map 装换成对象  只转换属性类型  为string int double long date
     * @param map map数据
     * @param object 装换的对象
     * @return 转换后的对象
     */
    public static Object mapToObject(Map<String, String> map, Object object) {
        Field[] fields = object.getClass().getDeclaredFields();
        for (Field field : fields) {
            String fieldName = field.getName();
            String value = map.get(fieldName);
            if (value == null) {
                System.out.println(fieldName + "值没有取到");
                continue;
            }

            String type = field.getType().toString();
            if (type.endsWith("String")) {
                try {
                    BeanUtils.setProperty(object, fieldName, value);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
            } else {
                Object num = null;
                try {
                    if (type.endsWith("int") || type.endsWith("Integer")) {
                        num = Integer.valueOf(value);
                    } else if (type.endsWith("long") || type.endsWith("Long")) {
                        num = Double.valueOf(value);
                    } else if (type.endsWith("double") || type.endsWith("Double")) {
                        num = Long.valueOf(value);
                    } else if (type.endsWith("boolean") || type.endsWith("Boolean")) {
                        num = "true".equals(value);
                    } else if (type.endsWith("Date")) {
                        SimpleDateFormat sFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        num = sFormat.parse(value);
                    }
                    BeanUtils.setProperty(object, fieldName, num);
                } catch (Exception e) {
                    //e.printStackTrace();
                }
            }
        }

        return object;
    }


}
