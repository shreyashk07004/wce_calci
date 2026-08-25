export interface RouteMetadata {
  title: string;
  description: string;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  '/': {
    title: 'WCE CGPA to Percentage Converter | Walchand College of Engineering, Sangli',
    description:
      'Free WCE CGPA to percentage calculator for Walchand College of Engineering, Sangli students. Convert your CGPA to percentage instantly using the official WCE grade conversion formula.',
  },
  '/how-its-calculated': {
    title: "How It's Calculated | WCE CGPA to Percentage Converter",
    description:
      'Learn how WCE CGPA is converted to percentage using the official Walchand College of Engineering formula and grading scale.',
  },
  '/history': {
    title: 'Calculation History | WCE CGPA to Percentage Converter',
    description:
      'View and manage your saved WCE CGPA to percentage calculation history.',
  },
  '/about': {
    title: 'About Us | WCE CGPA to Percentage Converter',
    description:
      'Learn more about the WCE CGPA to Percentage Converter tool for Walchand College of Engineering students.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | WCE CGPA to Percentage Converter',
    description:
      'Privacy Policy for WCE CGPA to Percentage Converter - how we handle your data.',
  },
  '/terms': {
    title: 'Terms of Use | WCE CGPA to Percentage Converter',
    description:
      'Terms of Use for WCE CGPA to Percentage Converter.',
  },
  '/contact': {
    title: 'Contact Us | WCE CGPA to Percentage Converter',
    description:
      'Contact the WCE CGPA to Percentage Converter support team for feedback or inquiries.',
  },
};

export const getRouteMetadata = (pathname: string): RouteMetadata => {
  return ROUTE_METADATA[pathname] || ROUTE_METADATA['/'];
};
