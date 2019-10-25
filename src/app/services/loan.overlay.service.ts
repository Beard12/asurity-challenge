import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { LoanComponent } from '../components/loan/loan.component';
import { Loan } from '../models/loan';
import { LoanOverlayRef } from './loan.overlayref';
import { LOAN_DATA } from './loan.injectiontokens';

interface LoanDialogConfig {
    hasBackdrop?: boolean;
    backdropClass?: string;
    loan?: Loan;
}

@Injectable({
    providedIn: 'root'
})
export class LoanOverlayService {
    constructor(
        private overlay: Overlay,
        private injector: Injector
    ) {}

    public open(loan : Loan) {
        const dialogConfig = {
            hasBackdrop: true,
            backdropClass: 'dark-backdrop',
            loan: loan
        }
        const overlayRef = this.createOverlay(dialogConfig);
        const dialogRef = new LoanOverlayRef(overlayRef);
        this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);
        overlayRef.backdropClick().subscribe(() => dialogRef.close())
        return dialogRef;
    }

    private attachDialogContainer(overlayRef: OverlayRef, config: LoanDialogConfig, dialogRef: LoanOverlayRef) {
        const injector = this.createInjector(config, dialogRef);
    
        const containerPortal = new ComponentPortal(LoanComponent, null, injector);
        overlayRef.attach(containerPortal);
    }

    private createInjector(config: LoanDialogConfig, dialogRef: LoanOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(LoanOverlayRef, dialogRef);
        injectionTokens.set(LOAN_DATA, config.loan);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private createOverlay(config: LoanDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    
    private getOverlayConfig(config: LoanDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        
        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });

        return overlayConfig;
    }
}