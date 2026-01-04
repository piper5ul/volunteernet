"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Check, QrCode, Mail, MessageSquare, Link as LinkIcon } from "lucide-react";

interface MagicLinkGeneratorProps {
  link: string;
  opportunityTitle?: string;
  squadName: string;
  spotsReserved?: number;
}

export function MagicLinkGenerator({
  link,
  opportunityTitle,
  squadName,
  spotsReserved,
}: MagicLinkGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link Copied!", {
        description: "Magic link has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Copy Failed", {
        description: "Please copy the link manually.",
      });
    }
  };

  const handleShareEmail = () => {
    const subject = `Join ${squadName} at ${opportunityTitle || "a volunteer event"}`;
    const body = `Hi there!\n\nYou're invited to volunteer with ${squadName}${opportunityTitle ? ` at ${opportunityTitle}` : ""}.\n\nClick here to register (no account required):\n${link}\n\nSee you there!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleShareSMS = () => {
    const message = `Join ${squadName}${opportunityTitle ? ` at ${opportunityTitle}` : ""}! Register here: ${link}`;
    window.location.href = `sms:?&body=${encodeURIComponent(message)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Magic Link Invitation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-3 text-sm text-muted-foreground">
            Share this link with your team members. They can register with just their name and
            email - no account required!
          </p>

          {opportunityTitle && (
            <div className="mb-3">
              <p className="text-sm font-medium">Event:</p>
              <p className="text-sm text-muted-foreground">{opportunityTitle}</p>
            </div>
          )}

          {spotsReserved !== undefined && spotsReserved > 0 && (
            <Badge variant="secondary" className="mb-3">
              {spotsReserved} spots reserved for {squadName}
            </Badge>
          )}
        </div>

        {/* Link Display */}
        <div className="flex gap-2">
          <Input value={link} readOnly className="font-mono text-sm" />
          <Button onClick={handleCopy} size="icon" variant="outline">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {/* Share Options */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareSMS}>
            <MessageSquare className="mr-2 h-4 w-4" />
            SMS
          </Button>
        </div>

        {/* QR Code Placeholder */}
        <div className="rounded-lg border bg-gray-50 p-6">
          <div className="flex flex-col items-center gap-3">
            <QrCode className="h-32 w-32 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              QR Code for easy mobile scanning
            </p>
            <Button variant="outline" size="sm">
              Download QR Code
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            <strong>How it works:</strong> When someone clicks this link, they'll be able to
            register with just their name and email. After attending the event, they'll receive
            an email inviting them to claim their volunteer hours and create a full account.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
