import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
  FaAws,
  FaCircleCheck,
  FaCloud,
  FaCode,
  FaCodePullRequest,
  FaDatabase,
  FaFilter,
  FaLink,
  FaMobileScreenButton,
  FaRegCommentDots,
  FaRobot,
  FaServer,
  FaShieldHalved,
  FaSlack,
} from 'react-icons/fa6';
import {
  SiArgo,
  SiApachekafka,
  SiApacheairflow,
  SiCaddy,
  SiCilium,
  SiCloudflare,
  SiDocker,
  SiGithubactions,
  SiGithub,
  SiGo,
  SiGooglebigquery,
  SiGooglecloudstorage,
  SiGooglegemini,
  SiGooglechrome,
  SiGooglemaps,
  SiGrafana,
  SiKeycloak,
  SiKubernetes,
  SiLonghorn,
  SiNextdotjs,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailscale,
  SiTerraform,
  SiTraefikproxy,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVault,
} from 'react-icons/si';

type Logo =
  | { icon: IconType; color?: string }
  | { src: string };
type LogoSet = Logo[] | IconType;

const AmazonS3Icon: IconType = (props) => (
  <svg viewBox="0 0 80 80" {...props}>
    <rect fill="#7AA116" height="80" width="80" />
    <path
      d="M60.836 42.893l.384-2.704c3.541 2.121 3.587 2.997 3.586 3.021-.006.005-.61.509-3.97-.317zm-1.943-.54c-6.12-1.852-14.643-5.762-18.092-7.392 0-.014.004-.027.004-.041a2.406 2.406 0 00-4.806 0 2.406 2.406 0 002.403 2.403c.582 0 1.11-.217 1.527-.562 4.058 1.921 12.515 5.774 18.68 7.594l-2.438 17.206a.986.986 0 00-.01.141c0 1.515-6.707 4.298-17.666 4.298-11.075 0-17.853-2.783-17.853-4.298 0-.046-.003-.091-.009-.136l-5.094-37.207C19.947 27.394 29.43 29 38.5 29c9.056 0 18.523-1.6 22.941-4.626l-2.548 17.979zM15 20.478C15.072 19.162 22.634 14 38.5 14 54.364 14 61.927 19.161 62 20.478v.449C61.13 23.878 51.33 27 38.5 27 25.648 27 15.843 23.868 15 20.913v-.435zm49 0C64 17.035 54.066 12 38.5 12S13 17.035 13 20.5l.094.754 5.548 40.524C18.775 66.31 30.861 68 38.494 68c9.472 0 19.535-2.178 19.665-6.219l2.396-16.897c1.333.319 2.43.482 3.311.482 1.183 0 1.983-.289 2.468-.867.398-.474.55-1.048.436-1.659-.259-1.384-1.902-2.876-5.248-4.785l2.376-16.762L64 20.5z"
      fill="#fff"
    />
  </svg>
);

const AmazonEKSIcon: IconType = (props) => (
  <svg viewBox="0 0 80 80" {...props}>
    <rect fill="#ED7100" height="80" width="80" />
    <path
      d="M46.842 32.199L40.013 40.12l7.428 8.664h-2.772L38 41v8h-2V32h2v7l6.181-6.801h2.661zM64 48.234l-8-4.801V32a1 1 0 00-.496-.864L44 24.426v-9.674l20 11.819v21.663zm1.509-23.095l-22-13a1 1 0 00-1.509.861v12a1 1 0 00.496.864L54 32.574V44a1 1 0 00.486.857l10 6A1 1 0 0066 50V26a1 1 0 00-.491-.861zM40.445 66.863L17 54.399V26.571l20-11.819v9.699l-10.537 6.705A1 1 0 0026 32v17a1 1 0 00.538.887l13.453 7a1 1 0 00.921.001l13.052-6.744 8.032 4.82-21.551 11.899zm24.07-12.721l-10-6a1 1 0 00-.974-.03l-13.086 6.761L28 48.393V32.549l10.537-6.705A1 1 0 0039 25V13a1 1 0 00-1.509-.861l-22 13A1 1 0 0015 26v29a1 1 0 00.53.883l24.454 13a1 1 0 00.953-.008l23.547-13a1 1 0 00.031-1.733z"
      fill="#fff"
    />
  </svg>
);

const AmazonEC2Icon: IconType = (props) => (
  <svg viewBox="0 0 80 80" {...props}>
    <rect fill="#ED7100" height="80" width="80" />
    <path
      d="M27 53h25V28H27v25zm27-25h4v2h-4v4h4v2h-4v3h4v2h-4v4h4v2h-4v4h4v2h-4v.136A1.866 1.866 0 0152.136 55H52v4h-2v-4h-4v4h-2v-4h-3v4h-2v-4h-4v4h-2v-4h-4v4h-2v-4h-.136A1.866 1.866 0 0125 53.136V53h-3v-2h3v-4h-3v-2h3v-4h-3v-2h3v-3h-3v-2h3v-4h-3v-2h3v-.136A1.866 1.866 0 0126.864 26H27v-4h2v4h4v-4h2v4h4v-4h2v4h3v-4h2v4h4v-4h2v4h.136A1.866 1.866 0 0154 27.864V28zM41 65.876a.124.124 0 01-.124.124H14.124a.124.124 0 01-.124-.124V39.124c0-.068.056-.124.124-.124H20v-2h-5.876A2.126 2.126 0 0012 39.124v26.752A2.126 2.126 0 0014.124 68h26.752A2.126 2.126 0 0043 65.876V61h-2v4.876zM68 14.124v26.752A2.126 2.126 0 0165.876 43H60v-2h5.876a.124.124 0 00.124-.124V14.124a.124.124 0 00-.124-.124H39.124a.124.124 0 00-.124.124V20h-2v-5.876A2.126 2.126 0 0139.124 12h26.752A2.126 2.126 0 0168 14.124z"
      fill="#fff"
    />
  </svg>
);

const logos: Record<string, LogoSet> = {
  ai: FaRobot,
  'amazon-bedrock': FaRobot,
  'amazon-ec2': AmazonEC2Icon,
  'amazon-eks': AmazonEKSIcon,
  'amazon-s3': AmazonS3Icon,
  argocd: [{ icon: SiArgo, color: '#ef7b4d' }],
  airflow: [{ icon: SiApacheairflow, color: '#00c7d4' }],
  'aws-api-gateway': FaAws,
  'aws-lambda': FaAws,
  aws: FaAws,
  browser: [{ icon: SiGooglechrome, color: '#4285f4' }],
  caddy: [{ icon: SiCaddy, color: '#1f88c0' }],
  'caddy-tailscale': [
    { icon: SiCaddy, color: '#1f88c0' },
    { icon: SiTailscale, color: '#f4f4f4' },
  ],
  cilium: [{ icon: SiCilium, color: '#f8c919' }],
  cloudflare: SiCloudflare,
  comment: FaRegCommentDots,
  docker: SiDocker,
  filter: FaFilter,
  gemini: [{ icon: SiGooglegemini, color: '#8e75ff' }],
  github: [{ icon: SiGithub, color: '#f5f5f5' }],
  'github-actions': [{ icon: SiGithubactions, color: '#2088ff' }],
  go: [{ icon: SiGo, color: '#00add8' }],
  'google-bigquery': [{ icon: SiGooglebigquery, color: '#669df6' }],
  'google-cloud-storage': [{ icon: SiGooglecloudstorage, color: '#4285f4' }],
  'google-maps': SiGooglemaps,
  grafana: [{ icon: SiGrafana, color: '#f2a33b' }],
  kafka: [{ icon: SiApachekafka, color: '#f5f5f5' }],
  keycloak: [{ icon: SiKeycloak, color: '#4d9bcf' }],
  kubevirt: [{ src: '/brands/kubevirt-icon-color.svg' }],
  'kubevirt-longhorn': [
    { src: '/brands/kubevirt-icon-color.svg' },
    { icon: SiLonghorn, color: '#f04b4c' },
  ],
  kubernetes: [{ icon: SiKubernetes, color: '#326ce5' }],
  link: FaLink,
  mobile: FaMobileScreenButton,
  nextjs: [{ icon: SiNextdotjs, color: '#f5f5f5' }],
  postgresql: [{ icon: SiPostgresql, color: '#6797c5' }],
  prometheus: [{ icon: SiPrometheus, color: '#e6522c' }],
  'prometheus-grafana': [
    { icon: SiPrometheus, color: '#e6522c' },
    { icon: SiGrafana, color: '#f2a33b' },
  ],
  'pull-request': FaCodePullRequest,
  python: SiPython,
  react: SiReact,
  shield: FaShieldHalved,
  slack: FaSlack,
  validation: FaCircleCheck,
  redis: [{ icon: SiRedis, color: '#ff4438' }],
  supabase: [{ icon: SiSupabase, color: '#3ecf8e' }],
  tailscale: [{ icon: SiTailscale, color: '#f4f4f4' }],
  terraform: SiTerraform,
  traefik: [{ icon: SiTraefikproxy, color: '#24a1c1' }],
  typescript: SiTypescript,
  vercel: SiVercel,
  vite: SiVite,
  vault: [{ icon: SiVault, color: '#f5f5f5' }],
};

const fallbackIcons: IconType[] = [FaServer, FaDatabase, FaCloud, FaCode];

type TechnologyIconProps = {
  name: string;
  label: string;
};

export function TechnologyIcon({ name, label }: TechnologyIconProps) {
  const fallbackIndex = [...name].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const definition = logos[name];
  const logoSet = Array.isArray(definition)
    ? definition
    : [{ icon: definition ?? fallbackIcons[fallbackIndex % fallbackIcons.length] }];

  return (
    <span aria-label={`${label} 로고`} role="img">
      {logoSet.map((logo, index) => {
        if ('src' in logo) {
          return (
            <Image
              alt=""
              aria-hidden="true"
              height={44}
              key={`${name}-${index}`}
              loading="eager"
              src={logo.src}
              unoptimized
              width={44}
            />
          );
        }

        const Icon = logo.icon;
        return <Icon aria-hidden="true" color={logo.color} key={`${name}-${index}`} />;
      })}
    </span>
  );
}
