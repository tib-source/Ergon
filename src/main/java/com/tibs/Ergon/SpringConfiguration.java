package com.tibs.Ergon;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.util.List;

@Configuration
public class SpringConfiguration implements WebMvcConfigurer {

    @Value("${image.upload.directory:${user.home}/.ergon/uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Handle the main static resources
        this.serveDirectory(registry, "/", "classpath:/static/");

        // Explicitly handle images with higher precedence
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + uploadDir + "/")
                .setCachePeriod(3600)
                .resourceChain(true);
    }

    private void serveDirectory(ResourceHandlerRegistry registry, String endpoint, String location) {
        String[] endpointPatterns = endpoint.endsWith("/")
                ? new String[]{endpoint.substring(0, endpoint.length() - 1), endpoint, endpoint + "**"}
                : new String[]{endpoint, endpoint + "/", endpoint + "/**"};
        registry
                .addResourceHandler(endpointPatterns)
                .addResourceLocations(location.endsWith("/") ? location : location + "/")
                .resourceChain(false)
                .addResolver(new PathResourceResolver() {
                    @Override
                    public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
                        Resource resource = super.resolveResource(request, requestPath, locations, chain);

                        if (resource != null) {
                            return resource;
                        }

                        // Only fall back to index.html for non-image paths
                        if (!requestPath.startsWith("images/")) {
                            return super.resolveResource(request, "/index.html", locations, chain);
                        }
                        return null;
                    }
                });
    }
}