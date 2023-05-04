import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/admin/service/user.service';
import { User } from 'src/app/auth/interfaces/user';


@Pipe({ name: 'userName' })
export class UserNamePipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(userId: string): Observable<string> {
    return this.userService.getById(userId).pipe(
      map((user: any) => {
        return user.name!;
      })
    );
  }
}
