package com.sjzk.util.ping;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.Socket;
import java.util.concurrent.TimeUnit;

public class myPing implements Runnable,PingReplyListener{
	 private int pingNum = 0;
	 private boolean isPing = false;
	

	public int getPingNum() {
		return pingNum;
	}

	public void setPingNum(int pingNum) {
		this.pingNum = pingNum;
	}

	public boolean isPing() {
		return isPing;
	}

	public void setPing(boolean isPing) {
		this.isPing = isPing;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
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
	}

	 public static void main(String[] args) throws Exception {
			myPing t = new myPing();
			Thread ts = new Thread(t);
			
			ts.start();
			
		}

	@Override
	public void onPingReply(InetAddress inetAddress, EchoPacket packet) {
		// TODO Auto-generated method stub
		pingNum = (int)packet.elapsedTime(TimeUnit.MILLISECONDS);
		isPing = true;
		System.out.println("来自"+inetAddress.getHostAddress()+"延迟:"+(int)packet.elapsedTime(TimeUnit.MILLISECONDS)+" ms");
	}
}
