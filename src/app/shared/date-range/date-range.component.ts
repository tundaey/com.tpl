import {
  Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent {

  constructor() {}

}
