import { describe, it, expect } from 'vitest';
import { getRouteMetadata, ROUTE_METADATA } from './routeMetadata';

describe('routeMetadata', () => {
  it('has metadata for all 7 required routes', () => {
    const routes = [
      '/',
      '/how-its-calculated',
      '/history',
      '/about',
      '/privacy-policy',
      '/terms',
      '/contact',
    ];

    routes.forEach((route) => {
      expect(ROUTE_METADATA[route]).toBeDefined();
      expect(ROUTE_METADATA[route].title).toBeTruthy();
      expect(ROUTE_METADATA[route].description).toBeTruthy();
    });
  });

  it('returns correct titles for each route', () => {
    expect(getRouteMetadata('/').title).toBe(
      'WCE CGPA to Percentage Converter | Walchand College of Engineering, Sangli'
    );
    expect(getRouteMetadata('/how-its-calculated').title).toBe(
      "How It's Calculated | WCE CGPA to Percentage Converter"
    );
    expect(getRouteMetadata('/history').title).toBe(
      'Calculation History | WCE CGPA to Percentage Converter'
    );
    expect(getRouteMetadata('/about').title).toBe(
      'About Us | WCE CGPA to Percentage Converter'
    );
    expect(getRouteMetadata('/privacy-policy').title).toBe(
      'Privacy Policy | WCE CGPA to Percentage Converter'
    );
    expect(getRouteMetadata('/terms').title).toBe(
      'Terms of Use | WCE CGPA to Percentage Converter'
    );
    expect(getRouteMetadata('/contact').title).toBe(
      'Contact Us | WCE CGPA to Percentage Converter'
    );
  });

  it('falls back to homepage metadata for unknown routes', () => {
    expect(getRouteMetadata('/unknown-path')).toEqual(ROUTE_METADATA['/']);
  });
});
