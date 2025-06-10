import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/navbar";
import Home from "@/pages/home";
import Work from "@/pages/work";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Project from "@/pages/project";
import VerizonCaseStudy from "@/pages/case-studies/verizon";
import LGCaseStudy from "@/pages/case-studies/lg";
import AdminLogin from "@/pages/admin/login";
import AdminLayout from "@/components/layout/admin-layout";
import Dashboard from "@/pages/admin/dashboard";
import NewProject from "@/pages/admin/projects/new";
import EditProject from "@/pages/admin/projects/edit";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/project/:id" component={Project} />
      <Route path="/case-studies/verizon" component={VerizonCaseStudy} />
      <Route path="/case-studies/lg" component={LGCaseStudy} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/*">
        {(params) => (
          <AdminLayout>
            <Switch>
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route path="/admin/projects/new" component={NewProject} />
              <Route path="/admin/projects/:id/edit" component={EditProject} />
              <Route component={NotFound} />
            </Switch>
          </AdminLayout>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;