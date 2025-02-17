/* @license Enterprise */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { isEmail } from 'class-validator';
import { Request } from 'express';
import { Strategy, StrategyOptions, TokenSet } from 'openid-client';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';

export type OIDCRequest = Omit<
  Request,
  'user' | 'workspace' | 'workspaceMetadataVersion'
> & {
  user: {
    identityProviderId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
};

@Injectable()
export class OIDCAuthStrategy extends PassportStrategy(
  Strategy,
  'openidconnect',
) {
  constructor(
    private client: StrategyOptions['client'],
    sessionKey: string,
  ) {
    super({
      params: {
        scope: 'openid email profile',
        code_challenge_method: 'S256',
      },
      client,
      usePKCE: true,
      passReqToCallback: true,
      sessionKey,
    });
  }

  async authenticate(req: Request, options: any) {
    return super.authenticate(req, {
      ...options,
      state: JSON.stringify({
        identityProviderId: req.params.identityProviderId,
      }),
    });
  }

  private extractState(req: Request): {
    identityProviderId: string;
  } {
    try {
      const state = JSON.parse(
        req.query.state && typeof req.query.state === 'string'
          ? req.query.state
          : '{}',
      );

      if (!state.identityProviderId) {
        throw new Error();
      }

      return {
        identityProviderId: state.identityProviderId,
      };
    } catch (err) {
      throw new AuthException('Invalid state', AuthExceptionCode.INVALID_INPUT);
    }
  }

  async validate(
    req: Request,
    tokenset: TokenSet,
    done: (err: any, user?: OIDCRequest['user']) => void,
  ) {
    try {
      const state = this.extractState(req);

      const userinfo = await this.client.userinfo(tokenset);

      if (!userinfo.email || !isEmail(userinfo.email)) {
        return done(new Error('Invalid email'));
      }

      done(null, {
        email: userinfo.email,
        identityProviderId: state.identityProviderId,
        ...(userinfo.given_name ? { firstName: userinfo.given_name } : {}),
        ...(userinfo.family_name ? { lastName: userinfo.family_name } : {}),
      });
    } catch (err) {
      done(err);
    }
  }
}
