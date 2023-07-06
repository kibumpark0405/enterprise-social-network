package enterprise.social.network.common;

import enterprise.social.network.UserManagementAndAuthenticationApplication;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = { UserManagementAndAuthenticationApplication.class })
public class CucumberSpingConfiguration {}
