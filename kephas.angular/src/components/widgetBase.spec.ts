import { expect } from 'chai';
import 'mocha';

import { Injectable, ElementRef, ViewContainerRef, Injector, ChangeDetectorRef } from '@angular/core';
import { AppServiceInfoRegistry, AppServiceContract, AppService } from '@kephas/core';
import { WidgetBase, AngularAppServiceInfoRegistry } from '..';

@AppService()
@AppServiceContract({ contractType: ChangeDetectorRef })
export class TestChangeDetectorRef extends ChangeDetectorRef {
    markForCheck(): void {
        throw new Error("Method not implemented.");
    }
    detach(): void {
        throw new Error("Method not implemented.");
    }
    detectChanges(): void {
        throw new Error("Method not implemented.");
    }
    checkNoChanges(): void {
        throw new Error("Method not implemented.");
    }
    reattach(): void {
        throw new Error("Method not implemented.");
    }
}

@Injectable({ providedIn: 'root' })
export class MyWidget extends WidgetBase {
    constructor(
        elementRef: ElementRef,
        viewContainerRef: ViewContainerRef,
    ) {
        super(elementRef, viewContainerRef);
    }

    getLogger() { return this.logger; }
    getNotification() { return this.notification; }
}

describe('WidgetBase.constructor', () => {
    it('should initialize logger and notification', () => {
        let angularRegistry = new AngularAppServiceInfoRegistry(AppServiceInfoRegistry.Instance);
        var injector = Injector.create({ providers: angularRegistry.getRootProviders() });
        var viewContainerRef = { injector: injector } as ViewContainerRef;
        var elementRef = {} as ElementRef;
        let widget = new MyWidget(elementRef, viewContainerRef);

        expect(widget.getLogger()).is.not.null;
        expect(widget.getNotification()).is.not.null;
    });
});
