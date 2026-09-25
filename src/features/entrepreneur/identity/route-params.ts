import { notFound } from 'next/navigation';
import type { BusinessId } from '../../../domain/ids';
import {
  findBusinessById,
  findBusinessEntity,
  findEntityIdentity,
  findApplicationChild,
  DEEP_SCREEN_BUSINESS_IDENTITY,
  type ApplicationChildKind,
  type EntrepreneurBusinessIdentity,
  type EntrepreneurEntityIdentity,
  type EntrepreneurEntityKind,
} from './catalog';

const RESERVED_ROUTE_IDS = new Set(['default', 'sample', 'temp', 'current']);

export function isUsableRouteParam(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const normalized = value.trim();
  return value === normalized && Boolean(normalized) && normalized !== '.' && normalized !== '..' && !RESERVED_ROUTE_IDS.has(normalized.toLowerCase());
}

export function parseBusinessRouteParam(value: unknown): BusinessId | undefined {
  if (!isUsableRouteParam(value)) return undefined;
  return findBusinessById(value)?.id;
}

export function parseEntityRouteParam(kind: EntrepreneurEntityKind, value: unknown): string | undefined {
  if (!isUsableRouteParam(value)) return undefined;
  return findEntityIdentity(kind, value)?.id;
}

export function requireBusinessRouteParam(value: unknown): EntrepreneurBusinessIdentity {
  if (!isUsableRouteParam(value)) notFound();
  const business = findBusinessById(value);
  if (!business) notFound();
  return business;
}

export function requireDeepScreenBusinessRouteParam(value: unknown): EntrepreneurBusinessIdentity {
  const business = requireBusinessRouteParam(value);
  if (DEEP_SCREEN_BUSINESS_IDENTITY.businessId !== business.id) notFound();
  return business;
}

export function requireBusinessEntityRouteParam(
  kind: EntrepreneurEntityKind,
  businessId: unknown,
  entityId: unknown,
): EntrepreneurEntityIdentity {
  if (!isUsableRouteParam(businessId) || !isUsableRouteParam(entityId)) notFound();
  if (!findBusinessById(businessId)) notFound();
  const entity = findBusinessEntity(kind, businessId, entityId);
  if (!entity) notFound();
  return entity;
}

export function requireApplicationChildRouteParam(
  kind: ApplicationChildKind,
  businessId: unknown,
  applicationId: unknown,
  childId: unknown,
): EntrepreneurEntityIdentity {
  if (!isUsableRouteParam(businessId) || !isUsableRouteParam(applicationId) || !isUsableRouteParam(childId)) notFound();
  const business = findBusinessById(businessId);
  if (!business) notFound();
  const child = findApplicationChild(kind, business.id, applicationId, childId);
  if (!child) notFound();
  return child;
}
