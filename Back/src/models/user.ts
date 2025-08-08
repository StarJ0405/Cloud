import { BaseEntity } from "data-source";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import { generateEntityId } from "utils/functions";
import { AccountLink } from "./account_link";

export enum UserRole {
  ADMIN = "admin",
  VENDOR = "vendor",
  MEMBER = "member",
  DEVELOPER = "developer",
}

@Entity({ name: "user" })
@Index(["created_at"])
export class User extends BaseEntity {
  @Column({ type: "character varying", unique: true })
  username?: string;

  @Column({ type: "character varying" })
  password_hash?: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.MEMBER })
  role?: UserRole;

  @Column({ type: "character varying", nullable: true })
  name?: string;

  @Column({ type: "character varying", nullable: true })
  phone?: string;

  @Column({ type: "character varying", nullable: true })
  email?: string;

  @Column({ type: "character varying", nullable: true })
  birthday?: string;

  @Column({ type: "character varying", nullable: true })
  brand_id?: string;

  @Column({ type: "character varying", nullable: true })
  ci?: string;

  @Column({ type: "character varying", nullable: true })
  di?: string;

  @Column({ type: "character varying", nullable: true })
  biometric_algorithm?: string;

  @Column({ type: "character varying", nullable: true })
  biometric_enabled?: string;

  @Column({ type: "character varying", nullable: true })
  biometric_public_key?: string;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
  })
  biometric_registered_at?: Date;

  @Column({ type: "character varying", nullable: true })
  pin_hash?: string;

  @Column({ type: "boolean", default: false })
  adult_mode?: boolean;

  @Column({ type: "jsonb", default: {} })
  metadata?: Record<string, unknown> | null;

  @OneToMany(() => AccountLink, (link) => link.user)
  accounts?: AccountLink[];

  @BeforeInsert()
  protected BeforeInsert(): void {
    this.id = generateEntityId(this.id, "usr");
  }
}
