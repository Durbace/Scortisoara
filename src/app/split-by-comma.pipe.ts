import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'splitByComma', standalone: true })
export class SplitByCommaPipe implements PipeTransform {
  transform(value: string): string[] {
    return (value ?? '').replace(/^.*?:\s*/,'').split(',').map(s => s.trim()).filter(Boolean);
  }
}
