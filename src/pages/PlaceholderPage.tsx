import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{pathname}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">This page route is now connected and reachable from navigation.</p>
          <div className="flex gap-2">
            <Button asChild><Link to="/home">Go Home</Link></Button>
            <Button asChild variant="secondary"><Link to="/settings">Settings</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
