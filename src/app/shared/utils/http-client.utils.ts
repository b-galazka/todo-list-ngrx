import { HttpParams, HttpResponseBase } from '@angular/common/http';
import { RequestStatus } from '../enums/request-status.enum';

export function convertObjectToHttpParams(params: Record<string, string | number>): HttpParams {
  const stringifiedParams = Object.entries(params).reduce(
    (result, [paramName, paramValue]) => ({ ...result, [paramName]: String(paramValue) }),
    {} as Record<string, string>
  );

  return new HttpParams({ fromObject: stringifiedParams });
}

export function determineResponseType({
  status
}: HttpResponseBase): Exclude<RequestStatus, RequestStatus.Pending | RequestStatus.Idle> {
  if (status < 300) {
    return RequestStatus.Success;
  }

  switch (status) {
    case 404:
      return RequestStatus.NotFound;

    default:
      return RequestStatus.Error;
  }
}
