package enterprise.social.network.common;

import enterprise.social.network.ProfileManagementApplication;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = { ProfileManagementApplication.class })
public class CucumberSpingConfiguration {}
