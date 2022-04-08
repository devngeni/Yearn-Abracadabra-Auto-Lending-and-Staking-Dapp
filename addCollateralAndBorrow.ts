async addCollateralAndBorrow(
    ust_amnt: number,
    leverage: number,
    ltv: number
  ) {
    try {
      const borrow = await this.cauldron().functions.cook(
        [11, 20, 10, 5, 30, 10], // ACTIONS
        [0, 0, 0, 0, 0, 0, 0], // VALUES
        [
          await this.updateExchangeRateEncode(),
          await this.bentoDepositEncode(ust_amnt),
          await this.addCollateralEncode(),
          await this.borrowEncode(ust_amnt, leverage, ltv),
          await this.callEncode(ust_amnt, leverage, ltv),
          await this.addCollateralEncode(),
        ], // DATA
        {
          gasLimit: 1000000,
          maxPriorityFeePerGas: max_priority_fee_per_gas * 1e9,
          maxFeePerGas: (max_priority_fee_per_gas + 50) * 1e9,
          type: 2,
        }
      );
      return borrow;
    } catch (error: any) {
      error = JSON.parse(JSON.stringify(error));
      console.log(
        '\n\n. . . \n\t‼️\t‼️\t‼️ BORROW FUNCTION ERROR: \t',
        error?.reason || error?.code,
        '\n'
      );
    }
  }
