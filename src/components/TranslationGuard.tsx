'use client';

import { useEffect } from 'react';

// Patches Node.prototype DOM mutation methods to be safe no-ops when Google
// Translate has re-parented nodes underneath React. Without this, the user
// triggering Translate on a page that later updates state (form submit,
// dropdown change) gets "Failed to execute 'insertBefore'/'removeChild' on
// 'Node'" and a white screen. The cost is one harmless guard branch on every
// DOM mutation; the win is the form not crashing for translated users.
declare global {
  interface Node {
    __translationGuardPatched?: boolean;
  }
}

export default function TranslationGuard() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof Node === 'undefined') return;
    if (Node.prototype.__translationGuardPatched) return;
    Node.prototype.__translationGuardPatched = true;

    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return originalRemoveChild.call(child.parentNode, child) as T;
        }
        return child;
      }
      return originalRemoveChild.call(this, child) as T;
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function <T extends Node>(
      newNode: T,
      referenceNode: Node | null,
    ): T {
      if (referenceNode && referenceNode.parentNode !== this) {
        return originalInsertBefore.call(this, newNode, null) as T;
      }
      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    };

    const originalReplaceChild = Node.prototype.replaceChild;
    Node.prototype.replaceChild = function <T extends Node>(newChild: Node, oldChild: T): T {
      if (oldChild.parentNode !== this) {
        if (oldChild.parentNode) {
          return originalReplaceChild.call(oldChild.parentNode, newChild, oldChild) as T;
        }
        return oldChild;
      }
      return originalReplaceChild.call(this, newChild, oldChild) as T;
    };

    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function <T extends Node>(child: T): T {
      try {
        return originalAppendChild.call(this, child) as T;
      } catch {
        return child;
      }
    };
  }, []);

  return null;
}
