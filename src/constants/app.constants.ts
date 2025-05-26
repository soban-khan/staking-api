export const publicMetadataDecoratorKey = 'public_metadata_decorator_key';

export enum TransactionType {
  STAKE = 'stake',
  UNSTAKE = 'unstake',
  REWARD = 'reward',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum RewardType {
  DAILY = 'daily',
  COMPOUND = 'compound',
}

export enum StakingStatus {
  ACTIVE = 'active',
  UNSTAKING = 'unstaking',
  COMPLETED = 'completed',
}
