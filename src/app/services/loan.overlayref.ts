import { OverlayRef } from '@angular/cdk/overlay';

export class LoanOverlayRef {
    constructor(private overlayRef: OverlayRef) { }
    close(): void {
        this.overlayRef.dispose();
    }
}