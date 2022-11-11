export interface IDeploymentResponse {
  apiVersion: string;
  items: IDeploymentItem[];
  kind: string;
  metadata: DeploymentMetadata;
}

export interface IDeploymentItem {
  metadata: ItemMetadata;
  spec: ItemSpec;
  status: Status;
}

export interface ItemMetadata {
  annotations: PurpleAnnotations;
  creationTimestamp: Date;
  generation: number;
  labels: PurpleLabels;
  managedFields: ManagedField[];
  name: string;
  namespace: string;
  resourceVersion: string;
  selfLink: string;
  uid: string;
}

export interface PurpleAnnotations {
  'deployment.kubernetes.io/revision': string;
  'field.cattle.io/publicEndpoints': string;
  'meta.helm.sh/release-name': string;
  'meta.helm.sh/release-namespace': string;
}

export interface PurpleLabels {
  'app.kubernetes.io/managed-by': string;
  runbook: string;
  'workload.user.cattle.io/workloadselector': string;
}

export interface ManagedField {
  apiVersion: string;
  fieldsType: string;
  fieldsV1: FieldsV1;
  manager: string;
  operation: string;
  time: Date;
}

export interface FieldsV1 {
  'f:metadata'?: FieldsV1FMetadata;
  'f:spec'?: FieldsV1FSpec;
  'f:status'?: FStatus;
}

export interface FieldsV1FMetadata {
  'f:annotations': PurpleFAnnotations;
  'f:labels'?: FLabels;
}

export interface PurpleFAnnotations {
  'f:field.cattle.io/publicEndpoints'?: DNSConfig;
  'f:meta.helm.sh/release-name'?: DNSConfig;
  'f:meta.helm.sh/release-namespace'?: DNSConfig;
  'f:deployment.kubernetes.io/revision'?: DNSConfig;
}

export interface DNSConfig {}

export interface FLabels {
  '.'?: DNSConfig;
  'f:app.kubernetes.io/managed-by'?: DNSConfig;
  'f:workload.user.cattle.io/workloadselector'?: DNSConfig;
  'f:runbook'?: DNSConfig;
}

export interface FieldsV1FSpec {
  'f:progressDeadlineSeconds'?: DNSConfig;
  'f:revisionHistoryLimit'?: DNSConfig;
  'f:selector'?: FSelector;
  'f:strategy'?: FStrategy;
  'f:template': FTemplate;
  'f:replicas'?: DNSConfig;
}

export interface FSelector {
  'f:matchLabels': FMatchLabels;
}

export interface FMatchLabels {
  '.': DNSConfig;
  'f:workload.user.cattle.io/workloadselector': DNSConfig;
}

export interface FStrategy {
  'f:rollingUpdate': FRollingUpdate;
  'f:type': DNSConfig;
}

export interface FRollingUpdate {
  '.': DNSConfig;
  'f:maxSurge': DNSConfig;
  'f:maxUnavailable': DNSConfig;
}

export interface FTemplate {
  'f:metadata'?: FTemplateFMetadata;
  'f:spec'?: FTemplateFSpec;
}

export interface FTemplateFMetadata {
  'f:labels'?: { [key: string]: DNSConfig };
  'f:annotations'?: FluffyFAnnotations;
}

export interface FluffyFAnnotations {
  '.'?: DNSConfig;
  'f:cattle.io/timestamp'?: DNSConfig;
  'f:kubectl.kubernetes.io/restartedAt'?: DNSConfig;
}

export interface FTemplateFSpec {
  'f:containers': FContainers;
  'f:dnsPolicy'?: DNSConfig;
  'f:imagePullSecrets'?: FImagePullSecrets;
  'f:restartPolicy'?: DNSConfig;
  'f:schedulerName'?: DNSConfig;
  'f:securityContext'?: DNSConfig;
  'f:terminationGracePeriodSeconds'?: DNSConfig;
  'f:dnsConfig'?: DNSConfig;
}

export interface FContainers {
  'k:{"name":"runbook"}': KNameRunbook;
}

export interface KNameRunbook {
  '.'?: DNSConfig;
  'f:imagePullPolicy'?: DNSConfig;
  'f:name'?: DNSConfig;
  'f:resources': FResources;
  'f:terminationMessagePath'?: DNSConfig;
  'f:terminationMessagePolicy'?: DNSConfig;
  'f:command'?: DNSConfig;
  'f:env'?: FEnv;
  'f:envFrom'?: DNSConfig;
  'f:image'?: DNSConfig;
}

export interface FEnv {
  '.': DNSConfig;
  'k:{"name":"ENABLE_RUNBOOK_FLOW"}': KName;
  'k:{"name":"SENTRY_ENVIRONMENT"}': KName;
  'k:{"name":"SENTRY_RELEASE"}': KName;
}

export interface KName {
  '.': DNSConfig;
  'f:name': DNSConfig;
  'f:value': DNSConfig;
}

export interface FResources {
  '.'?: DNSConfig;
  'f:requests'?: FLimits;
  'f:limits'?: FLimits;
}

export interface FLimits {
  '.'?: DNSConfig;
  'f:cpu'?: DNSConfig;
  'f:memory'?: DNSConfig;
}

export interface FImagePullSecrets {
  'k:{"name":"harbor"}'?: KNameHarbor;
}

export interface KNameHarbor {
  '.': DNSConfig;
  'f:name': DNSConfig;
}

export interface FStatus {
  'f:availableReplicas': DNSConfig;
  'f:conditions': FConditions;
  'f:observedGeneration': DNSConfig;
  'f:readyReplicas': DNSConfig;
  'f:replicas': DNSConfig;
  'f:updatedReplicas': DNSConfig;
}

export interface FConditions {
  '.': DNSConfig;
  'k:{"type":"Available"}': KType;
  'k:{"type":"Progressing"}': KType;
}

export interface KType {
  '.': DNSConfig;
  'f:lastTransitionTime': DNSConfig;
  'f:lastUpdateTime': DNSConfig;
  'f:message': DNSConfig;
  'f:reason': DNSConfig;
  'f:status': DNSConfig;
  'f:type': DNSConfig;
}

export interface ItemSpec {
  progressDeadlineSeconds: number;
  replicas: number;
  revisionHistoryLimit: number;
  selector: Selector;
  strategy: Strategy;
  template: Template;
}

export interface Selector {
  matchLabels: MatchLabels;
}

export interface MatchLabels {
  'workload.user.cattle.io/workloadselector': string;
}

export interface Strategy {
  rollingUpdate: RollingUpdate;
  type: string;
}

export interface RollingUpdate {
  maxSurge: number;
  maxUnavailable: number;
}

export interface Template {
  metadata: TemplateMetadata;
  spec: TemplateSpec;
}

export interface TemplateMetadata {
  annotations: FluffyAnnotations;
  creationTimestamp: null;
  labels: FluffyLabels;
}

export interface FluffyAnnotations {
  'cattle.io/timestamp': Date;
  'kubectl.kubernetes.io/restartedAt': Date;
}

export interface FluffyLabels {
  'ear-wapi': string;
  fortimanager: string;
  minio: string;
  puppet: string;
  runbook: string;
  'runbook-vcenter-settings': string;
  rundeck: string;
  score: string;
  servicenow: string;
  'workload.user.cattle.io/workloadselector': string;
}

export interface TemplateSpec {
  containers: Container[];
  dnsConfig: DNSConfig;
  dnsPolicy: string;
  imagePullSecrets: ImagePullSecret[];
  restartPolicy: string;
  schedulerName: string;
  securityContext: DNSConfig;
  terminationGracePeriodSeconds: number;
}

export interface Container {
  command: string[];
  env: Env[];
  envFrom: EnvFrom[];
  image: string;
  imagePullPolicy: string;
  name: string;
  resources: Resources;
  terminationMessagePath: string;
  terminationMessagePolicy: string;
}

export interface Env {
  name: string;
  value: string;
}

export interface EnvFrom {
  configMapRef?: ImagePullSecret;
  secretRef?: ImagePullSecret;
}

export interface ImagePullSecret {
  name: string;
}

export interface Resources {
  limits: Limits;
  requests: Limits;
}

export interface Limits {
  cpu: string;
  memory: string;
}

export interface Status {
  availableReplicas: number;
  conditions: Condition[];
  observedGeneration: number;
  readyReplicas: number;
  replicas: number;
  updatedReplicas: number;
}

export interface Condition {
  lastTransitionTime: Date;
  lastUpdateTime: Date;
  message: string;
  reason: string;
  status: string;
  type: string;
}

export interface DeploymentMetadata {
  resourceVersion: string;
  selfLink: string;
}
