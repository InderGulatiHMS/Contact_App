import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) {
      return value
    } else {
      return value.filter((res: any) => {
        return res.firstName.toLowerCase().includes(args.toLowerCase())
      })
    }
  }

}
