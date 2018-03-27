import { NestInterceptor, ExecutionContext, Interceptor } from '@nestjs/common';
import { LogService } from './log.service';
import { Observable } from 'rxjs/Observable';

@Interceptor()
export class LogInterceptor implements NestInterceptor {

    constructor(private readonly log: LogService) { }

    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        this.log.info('Before...');
        const now = Date.now();
        return stream$.do(
            () => this.log.info(`After... ${Date.now() - now}ms`),
        );
    }
}

