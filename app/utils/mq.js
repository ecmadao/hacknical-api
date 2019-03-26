

import AliMNS from 'ali-mns';
import config from 'config';
import logger from './logger';

const mqConfig = config.get('mq');

const REGION = mqConfig.region || process.env.HACKNICAL_ALI_MNS_REGION;
const ACCOUNT = new AliMNS.Account(
  mqConfig.accountId || process.env.HACKNICAL_ALI_ACCOUNT_ID,
  mqConfig.accessId || process.env.HACKNICAL_ALI_ACCESS_ID,
  mqConfig.accessKey || process.env.HACKNICAL_ALI_ACCESS_KEY,
);
const MNS = new AliMNS.MNS(
  ACCOUNT,
  REGION
);

class MessageQueue {
  constructor(qname) {
    this.qname = qname;
  }

  async createMQBatch() {
    logger.info(`[MQ:CREATE][${this.qname}]`);
    try {
      await MNS.createP(this.qname);
    } catch (e) {
      logger.debug(e);
    } finally {
      this.mqBatch = new AliMNS.MQBatch(this.qname, ACCOUNT, REGION);
    }
  }

  async createMQ() {
    logger.info(`[MQ:CREATE][${this.qname}]`);
    try {
      await MNS.createP(this.qname);
    } catch (e) {
      logger.debug(e);
    } finally {
      this.mq = new AliMNS.MQ(this.qname, ACCOUNT, REGION);
    }
  }

  async sendMessage(msg) {
    if (!this.mq) {
      await this.createMQ();
    }
    return await this.mq.sendP(msg);
  }

  async sendMessages(msgs) {
    if (!this.mqBatch) {
      await this.createQueue();
    }
    const datas = [];
    for (const msg of msgs) {
      datas.push(new AliMNS.Msg(msg, 16));
    }
    return await this.mqBatch.sendP(datas);
  }
}

export default MessageQueue;
