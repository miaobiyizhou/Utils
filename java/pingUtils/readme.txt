ping 工具包入口方法示例

try {
			AbstractPinger<Inet4Address> ping = new V4Pinger(9999);
			ping.addPingReplyListener(this);
			ping.start();
			ping.ping((Inet4Address)Inet4Address.getByName("47.93.14.46"), 9999, 1,99 , 3L, 3000L,64);
			if(isPing){
				System.out.println("结束");
			}else{
				System.out.println("ping不通");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
