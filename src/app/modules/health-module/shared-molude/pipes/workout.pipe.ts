import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any): any {
    if (value.type === 'endurance')
      return `
      Distance: ${value.endurance.distance + ' km'},
      Duration: ${value.endurance.duration + ' minutes'}
      `
    else
      return `
      Weight: ${value.strength.weight + ' kg'},
      Reps: ${value.strength.reps},
      Sets: ${value.strength.sets}
      `
  }
}
