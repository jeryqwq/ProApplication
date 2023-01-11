// @ts-nocheck
export default function Snowflake (_workerId, _dataCenterId, _sequence) {
    this.twepoch = 1288834974657n
    // this.twepoch = 0n;
    this.workerIdBits = 5n
    this.dataCenterIdBits = 5n
    this.maxWrokerId = -1n ^ (-1n << this.workerIdBits) // 值为：31
    this.maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits) // 值为：31
    this.sequenceBits = 12n
    this.workerIdShift = this.sequenceBits // 值为：12
    this.dataCenterIdShift = this.sequenceBits + this.workerIdBits // 值为：17
    this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits // 值为：22
    this.sequenceMask = -1n ^ (-1n << this.sequenceBits) // 值为：4095
    this.lastTimestamp = -1n
    // 设置默认值,从环境变量取
    this.workerId = 1n
    this.dataCenterId = 1n
    this.sequence = 0n
    if (this.workerId > this.maxWrokerId || this.workerId < 0) {
      throw new Error('_workerId must max than 0 and small than maxWrokerId-[' + this.maxWrokerId + ']')
    }
    if (this.dataCenterId > this.maxDataCenterId || this.dataCenterId < 0) {
      throw new Error('_dataCenterId must max than 0 and small than maxDataCenterId-[' + this.maxDataCenterId + ']')
    }

    this.workerId = window.BigInt(_workerId)
    this.dataCenterId = window.BigInt(_dataCenterId)
    this.sequence = window.BigInt(_sequence)
  }
  Snowflake.prototype.tilNextMillis = function (lastTimestamp) {
    let timestamp = this.timeGen()
    while (timestamp <= lastTimestamp) {
      timestamp = this.timeGen()
    }
    return window.BigInt(timestamp)
  }
  Snowflake.prototype.timeGen = function () {
    return window.BigInt(Date.now())
  }
  Snowflake.prototype.nextId = function () {
    let timestamp = this.timeGen()
    if (timestamp < this.lastTimestamp) {
      throw new Error('Clock moved backwards. Refusing to generate id for ' +
        (this.lastTimestamp - timestamp))
    }
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & this.sequenceMask
      if (this.sequence === 0n) {
        timestamp = this.tilNextMillis(this.lastTimestamp)
      }
    } else {
      this.sequence = 0n
    }
    this.lastTimestamp = timestamp
    return ((timestamp - this.twepoch) << this.timestampLeftShift) |
      (this.dataCenterId << this.dataCenterIdShift) |
      (this.workerId << this.workerIdShift) |
      this.sequence
  }

