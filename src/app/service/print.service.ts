import { Inject, Injectable } from '@angular/core';
import { SnackBar } from '@npt/npt-template';
import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';
import { Device } from 'zebra-browser-print-wrapper/lib/types';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  private zebra = new ZebraBrowserPrintWrapper();

  constructor(
    private snackBar: SnackBar,
    @Inject('disablePrintData') private disablePrint: boolean
  ) {
    this.setPrinter();
  }

  public async sendPrint(zpl: string): Promise<void> {
    if (!this.disablePrint) {
      try {
        const printerStatus = await this.zebra.checkPrinterStatus();
        console.log(printerStatus);
        if (printerStatus.isReadyToPrint) {
          this.zebra.print(zpl);
        } else {
          this.snackBar.showMessage(printerStatus.errors, 'ERROR');
        }
      } catch (error) {
        this.snackBar.showMessage('Stampante non configurata', 'ERROR');
      }
    }
  }

  private async setPrinter(): Promise<void> {
    /* const defaulPrinter = await this.zebra.getDefaultPrinter();
    console.log(defaulPrinter); */
    try {
      const availablePrinter = await this.zebra.getAvailablePrinters();
      availablePrinter.forEach((printer: Device) => {
        if (printer.name === 'zebra') {
          this.zebra.setPrinter(printer);
        }
      });
      console.log(this.zebra);
    } catch (error) {
      this.snackBar.showMessage('Stampante non configurata', 'ERROR');
    }
  }

}
