/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { UpladExcelComponent } from './uplad-excel.component';

let component: UpladExcelComponent;
let fixture: ComponentFixture<UpladExcelComponent>;

describe('UpladExcel component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UpladExcelComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(UpladExcelComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});