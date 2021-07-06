import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    if (!filterText) { return list; }
    return list ? list.filter(item =>
      Object.keys(item).some(
        k =>
          item[k] != null &&
            item[k]
              .toString()
              .toLowerCase()
              .includes(filterText.toLowerCase())
      )) : [];
  }

}
