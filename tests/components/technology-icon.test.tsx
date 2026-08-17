import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TechnologyIcon } from '@/components/technology-icon';

describe('TechnologyIcon', () => {
  it('renders a product logo with an accessible name', () => {
    render(<TechnologyIcon name="gemini" label="Gemini" />);

    const logo = screen.getByRole('img', { name: 'Gemini 로고' });
    expect(logo.querySelectorAll('svg')).toHaveLength(1);
  });

  it('renders every product logo in a composite technology node', () => {
    render(<TechnologyIcon name="caddy-tailscale" label="Caddy · Tailscale" />);

    const logo = screen.getByRole('img', { name: 'Caddy · Tailscale 로고' });
    expect(logo.querySelectorAll('svg')).toHaveLength(2);
  });

  it('uses the official KubeVirt artwork in the VM pool node', () => {
    render(<TechnologyIcon name="kubevirt-longhorn" label="KubeVirt · Longhorn" />);

    const logo = screen.getByRole('img', { name: 'KubeVirt · Longhorn 로고' });
    expect(logo.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('kubevirt-icon-color.svg'),
    );
    expect(logo.querySelectorAll('svg')).toHaveLength(1);
  });

  it.each([
    ['amazon-ec2', 'Amazon EC2', '#ED7100'],
    ['amazon-eks', 'Amazon EKS', '#ED7100'],
    ['amazon-s3', 'Amazon S3', '#7AA116'],
  ])('renders the official AWS service artwork for %s', (name, label, color) => {
    render(<TechnologyIcon name={name} label={label} />);

    const logo = screen.getByRole('img', { name: `${label} 로고` });
    expect(logo.querySelector('rect')).toHaveAttribute('fill', color);
  });
});
